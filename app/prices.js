// *Note* in the currency where it has `%amount` is where the number will go.

export default {
	GBP: {
		currency: '£%amount',
		vanilla: 55,
		tdb: 20,
		how: 20,
		ttk: 40,
		roi: 24.99,

		// This is an optional property.
		// The end result will take the format of:
		// 		${ title }, you spend ${ approximateCostPerHour } to be entertained per hour.
		comparisons: [{
			title: 'Seeing the latest blockbuster at the cinema (excluding things like travel cost/drinks/popcorn)',
			approximateCostPerHour: '£6.40'
		}, {
			title: 'Renting the latest blockbuster for home viewing (streaming)',
			approximateCostPerHour: '£1.60'
		}, {
			title: 'To see the London Symphony Orchestra play a two hour concert',
			approximateCostPerHour: '£21'
		}]
	},

	USD: {
		currency: '$%amount',
		vanilla: 60,
		tdb: 20,
		how: 20,
		ttk: 40,
		roi: 30,
		comparisons: [{
			title: 'Seeing the latest blockbuster at the cinema (excluding things like travel cost/drinks/popcorn)',
			approximateCostPerHour: '$7.20'
		}, {
			title: 'Renting the latest blockbuster for home viewing (streaming)',
			approximateCostPerHour: '$2.25'
		}, {
			title: 'Buying tickets to go see an MLB game',
			approximateCostPerHour: '$12.99'
		}, {
			title: 'Going to the Magic Kingdom in summer for the 14 hours the park is open (plus food)',
			approximateCostPerHour: '$9.43'
		}, {
			title: 'Taking a Carnival cruise from Miami to the Bahamas (plus drinks and excursion costs and fake Cuban cigars)',
			approximateCostPerHour: '$4.16'
		}]
	},

	EUR: {
		currency: '€%amount',
		vanilla: 60,
		tdb: 20,
		how: 20,
		ttk: 40,
		roi: 30,

		comparisons: [{
			title: 'Seeing the latest blockbuster at the cinema (excluding things like travel cost/drinks/popcorn)',
			approximateCostPerHour: '€4.43'
		}, {
			title: 'Renting the latest blockbuster for home viewing (streaming)',
			approximateCostPerHour: '€1.60'
		}]
	},

	CAD: {
		currency: '$%amount',
		vanilla: 60,
		tdb: 20,
		how: 20,
		ttk: 40,
		roi: 40,

		comparisons: [{
			title: 'Seeing the latest blockbuster at the cinema (excluding things like travel cost/drinks/popcorn)',
			approximateCostPerHour: '$7.20'
		}, {
			title: 'Renting the latest blockbuster for home viewing (streaming)',
			approximateCostPerHour: '$2.25'
		}]
	}

};