const path = require('path')
const fs = require('fs')

const deleteImg = async (img) => {
    const imgpath = path.join(__dirname, `../uploads/${img}`)
    if (imgpath)  await fs.promises.rm(imgpath)
}

module.exports = deleteImg;