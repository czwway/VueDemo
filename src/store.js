const STORAGE_KEY = 'todo'
export default {
	fetch() {
		return JSON.parse(window.localStorage.getItem(STORAGE_KEY || '[]'))
	},
	save(item) {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(item))
	},
	init(){
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify([]))
	}
}