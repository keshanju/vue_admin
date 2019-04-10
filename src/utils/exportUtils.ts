/**
 * 导出
 */
export class exportUtils {
    /**
     * 导出Csv
     */
    public static toCsv(
        jsonData: object,
        fileName: string,
        encode: string = 'utf-8'
    ) {
        let arrData =
            typeof jsonData != 'object' ? JSON.parse(jsonData) : jsonData
        let row = ''
        let csv = ''
        for (let header in arrData[0]) {
            row += header + ','
        }
        row = row.slice(0, -1)
        csv += row + '\r\n'
        for (const item of arrData) {
            let row = ''
            for (let header in item) {
                row += '"' + item[header] + '",'
            }
            row = row.slice(0, -1)
            csv += row + '\r\n'
        }
        if (!csv) {
            return false
        }
        fileName += fileName.replace(/ /g, '_')

        let myEncode = ''
        switch (encode) {
            case 'utf-8':
                myEncode = 'utf-8,\uFEFF'
                break
            case 'gb2312':
                myEncode = 'gb2312,'
                break
        }
        let uri = 'data:text/csv;charset=utf-8,\uFEFF' + encodeURI(csv)
        let link = document.createElement('a')
        link.href = uri
        //link.style = "visibility:hidden";
        link.download = fileName + '.csv'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        // 字符内容转变成blob地址
        // var blob = new Blob([csv], { type: 'text/csv;charset=ANSI,\uFEFF' })
        // let eleLink = document.createElement('a')
        // eleLink.href = URL.createObjectURL(blob)
        // // 触发点击
        // document.body.appendChild(eleLink)
        // eleLink.download = fileName + '.csv'
        // eleLink.click()
        // // 然后移除
        // document.body.removeChild(eleLink)
    }

    /**
     * 导出Csv
     */
    public toExcel() {}
}
