<template>
	<view class="waterfall" :style="{padding: warpPadding + 'px'}">
		<view id="left-column" class="column">
			<slot name="left" :leftList="leftList"></slot>
		</view>
		<view id="right-column" class="column">
			<slot name="right" :rightList="rightList"></slot>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {
		ref,
		onMounted,
		computed,
		watch,
		getCurrentInstance
	} from 'vue';
	import { getRect } from '@/utils/common'
	defineExpose({
		clear
	})
	const currentInstance = getCurrentInstance()
	const emit = defineEmits(['update:modelValue'])
	const props = defineProps({
		warpPadding: {
			type: Number,
			default: 10
		},
		modelValue: {
			// 瀑布流数据
			type: Array,
			required: true,
			default: function() {
				return [];
			}
		},
		// 每次向结构插入数据的时间间隔，间隔越长，越能保证两列高度相近，但是对用户体验越不好
		// 单位ms
		addTime: {
			type: [Number, String],
			default: 200
		},
		// id值，用于清除某一条数据时，根据此idKey名称找到并移除，如数据为{idx: 22, name: 'lisa'}
		// 那么该把idKey设置为idx
		idKey: {
			type: String,
			default: 'id'
		}
	})

	const tempList = ref([])
	const leftList = ref([])
	const rightList = ref([])
	// 破坏flowList变量的引用，否则watch的结果新旧值是一样的
	const copyFlowList = computed(() => {
		return cloneData(props.modelValue)
	})

	watch(() => copyFlowList.value, (nVal, oVal) => {
		// 取差值，即这一次数组变化新增的部分
		let startIndex = Array.isArray(oVal) && oVal.length > 0 ? oVal.length : 0;
		// 拼接上原有数据
		tempList.value = tempList.value.concat(cloneData(nVal.slice(startIndex)));
		splitData();
	})

	onMounted(() => {
		tempList.value = cloneData(copyFlowList.value)
	})
	
	async function splitData() {
		if (!tempList.value.length) return;
		let leftRect = await getRect('#left-column', currentInstance);
		let rightRect = await getRect('#right-column', currentInstance);
		// 如果左边小于或等于右边，就添加到左边，否则添加到右边
		let item = tempList.value[0];
		// 解决多次快速上拉后，可能数据会乱的问题，因为经过上面的两个await节点查询阻塞一定时间，加上后面的定时器干扰
		// 数组可能变成[]，导致此item值可能为undefined
		if (!item) return;
		// console.log(leftRect, rightRect);
		if (leftRect.height < rightRect.height) {
			leftList.value.push(item);
		} else if (leftRect.height > rightRect.height) {
			rightList.value.push(item);
		} else {
			// 这里是为了保证第一和第二张添加时，左右都能有内容
			// 因为添加第一张，实际队列的高度可能还是0，这时需要根据队列元素长度判断下一个该放哪边
			if (leftList.value.length <= rightList.value.length) {
				leftList.value.push(item);
			} else {
				rightList.value.push(item);
			}
		}
		// 移除临时列表的第一项
		tempList.value.splice(0, 1);
		// 如果临时数组还有数据，继续循环
		if (tempList.value.length) {
			setTimeout(() => {
				splitData();
			}, props.addTime)
		}
	}

	function cloneData(data: any) {
		return JSON.parse(JSON.stringify(data));
	}

	// 清空数据列表
	function clear() {
		leftList.value = [];
		rightList.value = [];
		// 同时清除父组件列表中的数据
		emit('update:modelValue', []);
		tempList.value = [];
	}

	// 清除某一条指定的数据，根据id实现
	function remove(id: string | number) {
		// 如果findIndex找不到合适的条件，就会返回-1
		let index = -1;
		index = leftList.value.findIndex(val => val[props.idKey] == id);
		if (index != -1) {
			// 如果index不等于-1，说明已经找到了要找的id，根据index索引删除这一条数据
			leftList.value.splice(index, 1);
		} else {
			// 同理于上方面的方法
			index = rightList.value.findIndex(val => val[props.idKey] == id);
			if (index != -1) rightList.value.splice(index, 1);
		}
		// 同时清除父组件的数据中的对应id的条目
		index = props.modelValue.findIndex(val => val[props.idKey] == id);
		if (index != -1) emit('update:modelValue', props.modelValue.splice(index, 1));
	}

	// 修改某条数据的某个属性
	function modify(id: number, key: string, value: any) {
		// 如果findIndex找不到合适的条件，就会返回-1
		let index = -1;
		index = leftList.value.findIndex(val => val[props.idKey] == id);
		if (index != -1) {
			// 如果index不等于-1，说明已经找到了要找的id，修改对应key的值
			leftList.value[index][key] = value;
		} else {
			// 同理于上方面的方法
			index = rightList.value.findIndex(val => val[props.idKey] == id);
			if (index != -1) rightList.value[index][key] = value;
		}
		// 修改父组件的数据中的对应id的条目
		index = props.modelValue.findIndex(val => val[props.idKey] == id);
		if (index != -1) {
			// 首先复制一份value的数据
			let data = cloneData(props.modelValue);
			// 修改对应索引的key属性的值为value
			data[index][key] = value;
			// 修改父组件通过v-model绑定的变量的值
			emit('update:modelValue', data);
		}
	}
</script>

<style lang="scss" scoped>
	.waterfall {
		display: flex;
		// padding: 0 20rpx;
		flex-direction: row;
		align-items: flex-start;

		.column {
			flex: 1;
		}

	}
</style>
