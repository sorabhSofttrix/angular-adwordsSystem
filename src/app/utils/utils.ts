export function toFormData<T>( formValue: T ) {
    let formData = new FormData();
    for ( const key of Object.keys(formValue) ) {
      const value = formValue[key];
      if(value){
        formData.append(key, value);
      }      
    }
    return formData;
  }