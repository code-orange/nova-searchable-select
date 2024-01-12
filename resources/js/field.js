import IndexField from './components/IndexField'
import DetailField from './components/DetailField'
import FormField from './components/FormField'
import SearchInput from './components/SearchInput'

Nova.booting((app, store) => {
    app.component('input-searchable-select', SearchInput)
	app.component('index-searchable-select', IndexField)
	app.component('detail-searchable-select', DetailField)
	app.component('form-searchable-select', FormField)
})
