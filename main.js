const http = require('http');
const fs = require('fs');
const xml = require('fast-xml-parser');

const server = http.createServer((req, res) => {
     
        const xmlData = fs.readFileSync('data.xml', 'utf-8');
        const parser = new xml.XMLParser();
        const obj = parser.parse(xmlData);

        
        const data = obj.indicators.basindbank;
        const sortedData = data
        .filter(item => item.parent === 'BS3_BanksLiab')
        .map(item => ({
            txten: item.txten,
            value: item.value,
        }));
        
        const newObj = {
            data: {
                indicators: sortedData,
            },
        };

        const builder = new xml.XMLBuilder();
        const xmlStr = builder.build(newObj);

        res.writeHead(200, { 'Content-Type': 'application/xml' });
        res.end(xmlStr);


    });

server.listen(8000, () => {
    console.log('Server is runing on localhost:8000');
});
