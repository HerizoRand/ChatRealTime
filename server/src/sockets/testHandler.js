const Count = require('../models/Count')

module.exports = async (io , socket) => {
    const COUNT_ID = 'main'

    let count = await Count.findOne({ id : COUNT_ID})
    if (!count) {
        count = await Count.create({ id: COUNT_ID, value: 0})
    }

    socket.emit('count history' , count)

    // socket.on('count add' , async ()=> {
    //     count.value += 1
    //     await count.save

    //     io.emit('count updated' , count.value)
    // })
    // socket.on('count minus' , async () => {
    //     count.value -= 1
    //     await count.save

    //     io.emit('count updated' , count.value)
    // })

    socket.on('count update' , async ({ action }) => {
        const countDoc = await Count.findOne({ id: COUNT_ID })
        
        if ( action == 'add' ) countDoc.value++
        else if ( action == 'minus') countDoc.value--

        await countDoc.save()

        io.emit('count updated' , countDoc.value)
    })
}