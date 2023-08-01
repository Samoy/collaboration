importScripts('./scripts/ffmpeg.min.js');
const ffmpeg = self.FFmpeg.createFFmpeg({log: false});
onmessage = async (event) => {
  try {
    const {buffer, name, inType, outType} = event.data;
    // 加载ffmpeg
    if (!ffmpeg.isLoaded()) {
      await ffmpeg.load();
    }
    // 设置进度回调
    ffmpeg.setProgress(({ratio}) => {
      postMessage({data: ratio, type: 'progress'});
    });
    // 设置日志回调
    ffmpeg.setLogger(({type, message}) => {
      postMessage({data: {type, message}, type: 'logger'});
    })
    // 写入文件到内存
    ffmpeg.FS('writeFile', `${name}.${inType}`, new Uint8Array(buffer));
    // 开始转码
    await ffmpeg.run('-i', `${name}.${inType}`, `${name}.${outType}`);
    // 读取文件
    const data = ffmpeg.FS('readFile', `${name}.${outType}`);
    // 回传数据至页面
    postMessage({data, type: 'result'}, [data.buffer]);
    // 删除内存文件
    ffmpeg.FS('unlink', `${name}.${inType}`);
    ffmpeg.FS('unlink', `${name}.${outType}`);
  } catch (e) {
    postMessage({type: 'error', data: e});
  } finally {
    ffmpeg.exit();
  }
}
