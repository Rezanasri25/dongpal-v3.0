//#region node_modules/.nitro/vite/services/ssr/assets/sample-BEk908eW.js
var SAMPLE_RECEIPT = {
	merchant: "رستوران خوب",
	date: "۱۴۰۵/۰۶/۲۱",
	currency: "IRR",
	items: [
		{
			name: "غذای اصلی",
			amount: 12e5
		},
		{
			name: "سالاد",
			amount: 25e4
		},
		{
			name: "نوشیدنی",
			amount: 25e4
		},
		{
			name: "دسر",
			amount: 3e5
		}
	],
	subtotal: 2e6,
	tax: 189e3,
	tip: 0,
	total: 2289e3
};
var TEMPLATES = [
	{
		id: "resto",
		label: "رستوران",
		tax: 10,
		tip: 10,
		title: "شام رستوران"
	},
	{
		id: "cafe",
		label: "کافه",
		tax: 10,
		tip: 10,
		title: "کافه"
	},
	{
		id: "taxi",
		label: "تاکسی",
		tax: 0,
		tip: 0,
		title: "تاکسی"
	},
	{
		id: "trip",
		label: "سفر",
		tax: 0,
		tip: 0,
		title: "هزینه سفر"
	},
	{
		id: "party",
		label: "مهمونی",
		tax: 0,
		tip: 10,
		title: "مهمونی"
	},
	{
		id: "shop",
		label: "خرید",
		tax: 10,
		tip: 0,
		title: "خرید گروهی"
	}
];
//#endregion
export { TEMPLATES as n, SAMPLE_RECEIPT as t };
