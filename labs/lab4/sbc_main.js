d3.csv('mb_stack_data.csv', data => {
	const data_obj2 = formatData2(data);
	const data_obj3 = formatData3(data);
	// console.log(data_obj2);
	console.log(data_obj3);
	const sn = getStateNames(data);
	// console.log(sn);
	const data_obj4 = formatData4(data);
	// console.log(data_obj4);
	return data_obj4;

});

function formatData2(data) {
	var f_data = d3.nest()
				.key( function(d) { return d.State; })
				.rollup( function(d) { 
					// console.log(d);
					return d[0]; })
				.entries(data);
	return f_data;
}

function formatDataRow(d) {
	// d.State = d.State,
	f=[];
	f.Under_5_Years = parseInt(d.Under_5_Years),
	f.Years_5_to_13 = parseInt(d.Years_5_to_13),
	f.Years_14_to_17 = parseInt(d.Years_14_to_17),
	f.Years_18_to_24 = parseInt(d.Years_18_to_24),
	f.Years_25_to_44 = parseInt(d.Years_25_to_44),
	f.Years_45_to_64 = parseInt(d.Years_45_to_64),
	f.Years_65_and_Over = parseInt(d.Years_65_and_Over),
	f.total = (f.Under_5_Years + f.Years_5_to_13 + f.Years_14_to_17 + f.Years_18_to_24
		+ f.Years_25_to_44 + f.Years_45_to_64 +f.Years_65_and_Over)
	return f;
}

function formatData3(d) {
	const statranges = getStatRanges(d);
	const f_data3 = [];
	d.forEach(row => {
		// console.log(row);
		// console.log(row.State);
		// console.log(formatDataRow(row));
		const dict = {
			id: row.State
		};
		dict['values'] = formatDataRow(row);
		f_data3.push(dict);
		// d.forEach(s => {
		// 	dict[s['State']] = +s[range];
		// });
		// f_data3.push(dict);
	})
	return f_data3;
}

function formatData4(d) {
	const s_names = getStateNames(d);
	const f_data4 = [];
	s_names.forEach(name => {
		const dict = {
			id: name
		}
		// d.forEach(s => {
		// 	console.log(formatDataRow(s));
		// });
	})
	return f_data4;
}

function getStatRanges(state_data) {
	return Object.keys(state_data[0]).filter(v => v !== 'State');
}

function getStateNames(state) {
	const statenames = [];
	state.forEach(d => {
		// console.log(d);
		statenames.push(d.State);
	})
	return statenames;
}