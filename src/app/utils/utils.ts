

export function toFormData<T>(formValue: T) {
  let formData = new FormData();
  for (const key of Object.keys(formValue)) {
    const value = formValue[key];
    if (value) {
      formData.append(key, value);
    }
  }
  return formData;
}

export function validateFile(file, allowedType: string = 'image') {
  let error: any = '';
  const allowedExt = new allowedFiles;
  const allowedExtension = (allowedType == 'file') ? allowedExt.file : (allowedType == 'video') ? allowedExt.video : allowedExt.image;
  error = (!allowedExtension.includes(file.name.split('.').pop().toLowerCase()))
    ? `Allowed files are '${allowedExtension.join(',')}'`
    : (!file.size) ? `File size is 0 Byte` : false;
  return (error) ? error : true;
}

export function covertStringDateToObject(data: string) {
  const a = data.split(' ')[0].split('-');
  return { "year": parseInt(a[0]), "month": parseInt(a[1]), "day": parseInt(a[2]) };
}

export function covertDateObjectToString(data: { year: any, day: any, month: any }) {
  return data.year + '-' + data.month + '-' + data.day;
}

export class allowedFiles {
  public image: string[] = ['jpeg', 'jpg', 'png', 'gif', 'bmp'];
  public file: string[] = ['pdf', 'doc', 'docx', 'txt', 'odt'];
  public video: string[] = ['mp4'];
}

