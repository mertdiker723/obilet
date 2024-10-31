// Cors hatası için bu url Komut'a yapıştırlıp url Chrome da cors disabled edilmiş bir şekilde çalıştırılabilir

"C:/Program Files (x86)/Google/Chrome/Application/chrome.exe" --user-data-dir="C:/Chrome dev session" --disable-web-security


// "proxy": "https://v2-api.obilet.com", package.json a eklenir. src>core>apiRoutes>route.ts içindeki const mainURL = 'https://v2-api.obilet.com/api' kısım 
const mainURL = '/api'  şeklinde yazılarak cors hatası development ortamında giderilebilir