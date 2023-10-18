const validWeapon = 'Orin dagger'
const price ='200 peças de ouro'
const orderId = 5

const validRegister = {name: validWeapon, price: price, orderId: orderId}
const validRegisterWithId = { id: 7, name: validWeapon, price: price, orderId: orderId}

const invalidPost = {id: 7, price: price, orderId: orderId}
const invalidPostPrice = {name: validWeapon , price: 'olá', orderId: orderId}


const existingUser = { 
    id: 5, 
    name: 'Harpa de Dagda',
    price: '15 peças de ouro,',
    orderId: 3
  };

 
export default {
    invalidPost,
    validRegister,
    existingUser,
    invalidPostPrice,
    validRegisterWithId,
}