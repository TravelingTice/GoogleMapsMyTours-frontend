export default function(file) {
  return new Promise((resolve, reject) => {
    if (!file) return resolve(null);

    const reader = new FileReader();
    
    reader.onloadend = function(e) {
      resolve(e.target.result)
    }
    
    reader.readAsText(file);
  });
}