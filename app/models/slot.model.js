'use strict';

/**
	* slot Model
	*/



module.exports = function(sequelize, DataTypes) {

	let slot = sequelize.define('slot', 
		{
            day: {
                type : DataTypes.STRING,
                values:['monday','tuesday','wednesday','thursday','friday','saturday','sunday','weekly']
            }
           
		}
		,
        {
            	associate: function(models) {
				slot.belongsTo(models.schedule);
				slot.hasMany(models.timeSlot);
                }
		}
	);

	return slot;
};