import MyInputSearch from '~/atomic/atoms/MyInputSearch'
import MySelectWarningLevel from '~/atomic/molecules/MySelectWarningLevel'

interface ViolateRulesFilterProps {
	setSelect: (v: string) => void
	setSearch: (v: string) => void
}

export default function ViolateRulesFilter({ setSelect, setSearch }: ViolateRulesFilterProps) {
	const handleChangeSelect = (value: string) => {
		if (value) {
			setSelect(value)
		} else {
			setSelect('')
		}
	}
	const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value === '') {
			setSearch('')
		}
	}
	const onSearch = (value: string) => {
		if (value) {
			setSearch(value)
		} else {
			setSearch('')
		}
	}
	return (
		<div className="flex items-center gap-4">
			<MySelectWarningLevel className="min-w-48" onChange={handleChangeSelect} />
			<MyInputSearch onChange={handleChangeSearch} onSearch={onSearch} />
		</div>
	)
}
