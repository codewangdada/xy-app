<script setup lang="ts">
	import silenceUpdate from '@/uni_modules/rt-uni-update/js_sdk/silence-update.js' //引入静默更新
	import {
		onShow
	} from "@dcloudio/uni-app";
	import { getVersion } from '@/api/base'

	onShow(async () => {
		plus.runtime.getProperty(plus.runtime.appid, async (inf) => {
			const { data } = await getVersion()
			//判断后台返回版本号是否大于当前应用版本号 && 是否发行 （上架应用市场时一定不能弹出更新提示）
			if (Number(data.edition_number) > Number(inf.versionCode) && data.edition_issue == 1) {

				//如果是wgt升级，并且是静默更新 （注意！！！ 如果是手动检查新版本，就不用判断静默更新，请直接跳转更新页，不然点击检查新版本后会没反应）
				if (data.package_type == 1 && data.edition_silence == 1) {

					//调用静默更新方法 传入下载地址
					silenceUpdate(data.edition_url)

				} else {
					//跳转更新页面 （注意！！！如果pages.json第一页的代码里有一打开就跳转其他页面的操作，下面这行代码最好写在setTimeout里面设置延时3到5秒再执行）
					uni.navigateTo({
						url: '/uni_modules/rt-uni-update/components/rt-uni-update/rt-uni-update?obj=' +
							JSON.stringify(data)
					});
				}
			}
		});
	})
</script>
<style>

</style>