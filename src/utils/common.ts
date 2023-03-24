export function getRect(select: string, instance: any) {
	return new Promise((resolve) => {
		uni.createSelectorQuery().in(instance).select(select).boundingClientRect((data) => {
			resolve(data)
		}).exec()
	})
}