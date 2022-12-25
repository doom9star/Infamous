export namespace Utils {
  export function readFile(file: File): Promise<string> {
    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.onload = (e) => res(e.target?.result as string);
      reader.onerror = (e) => rej(e.target?.error);
      reader.readAsDataURL(file);
    });
  }

  export async function dataURLToFile(dataURL: string, filename: string) {
    const response = await fetch(dataURL);
    const blob = await response.blob();
    const file = new File([blob], filename, {
      type: "images/jpeg",
      lastModified: 10,
    });
    return file;
  }

  export function ifOrNull(condition: boolean, value: any): any {
    return condition ? value : null;
  }
}
