// 载入electron模块
const electron = require('electron');
// 创建应用程序对象
const app = electron.app;
// 创建一个浏览器窗口。主要是用来加载html页面
const BrowserWindow = electron.BrowserWindow;
const path = require('path');

const packageJSON = require('./package.json')

// 声明一个BrowserWindow对象实例
let mainWindow;

// 定义一个创建浏览器窗口的方法
function createWindow () {
    // 创建一个浏览器窗口对象，并指定窗口大小
    mainWindow = new BrowserWindow({
        titleBarStyle: 'hidden-inset',
        width: 800,
        height: 600
    });
    // 通过浏览器窗口对象加载index.html文件，同时也是可以加载一个互联网地址
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    // or mainWindow.loadURL('./index.html');
    // 监听浏览器窗口对象是否关闭，关闭之后直接将mainWindow指向空引用，也就是回收对象内存空间。
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
    console.log(packageJSON.version)
    // 打开开发者工具
    // mainWindow.webContents.openDevTools();

}
// 监听应用程序对象是否完成了初始化，初始化完成之后即可创建浏览器窗口。
app.on('ready', createWindow);

// 监听应用程序对象中的所有浏览器窗口对象时候全部被关闭，如果全部被关闭，则退出整个应用程序。
app.on('window-all-closed', function () {
    // 判断当前操作系统是否是window系统，因为这个事件只在window系统中作用。
    if (process.platform !== 'darwin') {
        // 退出整个应用程序
        app.quit();
    }
});
// 监听应用程序图标被通过点或者没有任何浏览器窗口显示在桌面上，那我们应该重新创建并打开浏览器窗口，避免Mac OS X系统回收或者销毁浏览器窗口。
app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});
