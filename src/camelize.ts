export function camelize(str: string): string {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
      // return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
      return letter.toUpperCase();
    }).replace(/\s+/g, '');
  }