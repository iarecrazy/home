var simpleDocControllers = angular.module('simpleDocControllers', []);

simpleDocControllers.controller('TableController', ['$http', function($http) {
	var self = this;
	
	self.editMode = true;
	self.selectedCell = null;

	$http.get('/app/api/table.json').success(function(data) { self.table = data; });

	self.newTable = function()
	{
		self.table = {};
	}
	
	self.addRow = function()
	{
		if(!self.table.rows) 
		{
			self.table.rows = [];
		}
		
		self.table.rows.push(
			{
				id: self.table.rows.length,
				width: 1,
				cells:
				[ 
					{ 
						id: 1, 
						width: 1,
						content: 
						{ 
							type: "none",
							value: ""
						}
					}
				]
			}
		);
	}
	
	self.switchMode = function()
	{
		self.editMode = !self.editMode;
		console.log("mode switched");
	}
	
	self.selectRow = function(row)
	{
		row.selected = true;
	}
	
	self.selectCell = function(cell)
	{
		if(!cell.content) cell.content = {};
		self.selectedCell = cell;
	};

	self.showNavBar = function(cell)
	{
		return self.editMode && self.selectedCell == cell;
	}
}]);
