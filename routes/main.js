import fs, { lstatSync } from 'node:fs'

export default function (app) {

   function isFolder(path) {
      return fs.lstatSync(path).isDirectory() && fs.existsSync(path)
   }

   app.get('/', (req, res) => {
      const base = './files/';



      // if ('path' in req.query) {
      //    path = req.query.path
      // }

      // if (isFolder(base + path)) {
      //    let files = fs.readdirSync(base + path).map(item => {
      //       const isDir = lstatSync(base + path + '/' + item).isDirectory();
      //       let size = 0;
      //       if (!isDir) {
      //          size = fs.statSync(base + path + '/' + item)

      //       }

      //       return {
      //          name: item,
      //          dir: isDir,
      //          size: size.size ?? 0
      //       }
      //    })
      //    res.json({
      //       path: path,
      //       result: true,
      //       files: files
      //    })
      // }
   })
}