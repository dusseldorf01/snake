export default (inputFile: HTMLInputElement, maxFileSize:number) => {
  if (inputFile && inputFile.files) {
    if (inputFile.files[0] && inputFile.files[0].size / 1000000 > maxFileSize) {
      return false;
    }
  }
  return true;
};
