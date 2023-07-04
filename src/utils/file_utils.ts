import { RcFile } from 'antd/lib/upload';

type FileName = {
  name: string;
  ext: string;
};

export class FileUtils {
  static getBase64(file: RcFile): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }
  static getFileName(fileName: string): FileName {
    let name: string[] | string = fileName.split('.');
    const ext = name.pop() || '';
    name = name.join();
    return { name, ext };
  }
}
