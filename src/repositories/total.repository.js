const { prisma } = require('../service/prisma')

exports.getTotalsByMonth = async (month, userId) => {
    const totalsInputs = await prisma.inputs.groupBy({
        where: { month, userId },
        by: ['month'],
        _sum: {
            value: true
        }
    })

    const totalsOutputs = await prisma.outputs.groupBy({
        where: { month },
        by: ['month'],
        _sum: { 
            value: true
        }
    })

    const valueInputs = totalsInputs.length ? totalsInputs[0]._sum : {value: 0}
    const valueOutputs = totalsOutputs.length ? totalsOutputs[0]._sum : {value: 0}
    const balance =  valueInputs.value - valueOutputs.value 

    

    return {valueInputs, valueOutputs, balance}
}