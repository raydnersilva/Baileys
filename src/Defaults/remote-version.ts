/* eslint-disable prettier/prettier */
import https from 'https';

const getRemoteVersion = (): Promise<number[]> => {
  return new Promise((resolve, reject) => {
    https.get('https://raw.githubusercontent.com/raydnersilva/baileys-version-auto/main/baileys-version.json', (res) => {
      let data = ''

      res.on('data', (chunk) => {
        data += chunk
      })

      res.on('end', () => {
        try {
          const json = JSON.parse(data)
          resolve(json.version)
        } catch (err) {
          reject('Erro ao parsear JSON da versão: ' + err)
        }
      })
    }).on('error', (err) => {
      reject('Erro ao buscar versão remota: ' + err)
    })
  })
}

export default getRemoteVersion;