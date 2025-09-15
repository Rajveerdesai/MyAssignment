const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_\-+={}\[\]|\\:;"'<>,.?/~`]).{8,16}$/;
function validatePassword(password){
  if(!password) return { ok:false, msg:'Password required' };
  if(password.length < 8 || password.length > 16) return { ok:false, msg:'Password must be 8-16 chars' };
  if(!passwordRegex.test(password)) return { ok:false, msg:'Password must include an uppercase and special char' };
  return { ok:true };
}
function validateName(name){
  if(!name) return { ok:false, msg:'Name required' };
  if(name.length < 20 || name.length > 60) return { ok:false, msg:'Name must be 20-60 chars' };
  return { ok:true };
}
function validateAddress(address){
  if(!address) return { ok:true };
  if(address.length > 400) return { ok:false, msg:'Address max 400 chars' };
  return { ok:true };
}
module.exports = { validatePassword, validateName, validateAddress };
