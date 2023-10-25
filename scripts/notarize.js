/* Based on https://kilianvalkhof.com/2019/electron/notarizing-your-electron-application/ */

// eslint-disable-next-line import/no-extraneous-dependencies
const { notarize } = require('electron-notarize')

exports.default = async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context
  if (electronPlatformName !== 'darwin') {
    return
  }

  const appName = context.packager.appInfo.productFilename

  // eslint-disable-next-line no-return-await
  return await notarize({
    appBundleId: 'com.bitfinex.honey',
    appPath: `${appOutDir}/${appName}.app`,
    appleId: process.env.APPLEID,
    appleIdPassword: process.env.APPLEIDPASS,
  })
}
