'use strict'

// In this example replicants are being declared in the extension first
// You can always declare them in panels or graphics

module.exports = nodecg => {
	const timeReplicant = nodecg.Replicant('timestamp', {defaultValue: 1562259347886})
	const nameReplicant = nodecg.Replicant('name', {defaultValue: "fellow reactive bundle craftsman"})
}
