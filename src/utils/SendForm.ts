/**
 * แปลงข้อมูล JSON ให้เป็น FormData (Flat Structure รองรับไฟล์)
 * @param data ข้อมูล JSON (Object หรือ Array)
 * @returns FormData
 */ 
export function convertToSimpleFormData<T extends Record<string, any>>(data: T): FormData {
    const formData = new FormData();
  
    Object.entries(data).forEach(([key, value]) => {
      if (value === null || value === undefined) {
        return; // ข้าม null หรือ undefined
      }
  
      if (value instanceof File || value instanceof Blob) {
        // กรณีเป็นไฟล์หรือ Blob
        formData.append(key, value);
      } else if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        // กรณีเป็น Primitive
        formData.append(key, value.toString());
      } else if (Array.isArray(value)) {
        // กรณีเป็น Array
        value.forEach((item, index) => {
          if (item instanceof File || item instanceof Blob) {
            formData.append(`${key}[${index}]`, item);
          } else {
            formData.append(`${key}[${index}]`, item.toString());
          }
        });
      }
    });
  
    return formData;
  }