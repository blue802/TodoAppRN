import realm from '../realm';

export const addUser = (user)=>
{
    realm.write(() => 
    {
        realm.create('User', user);
    });
}

export const removeUser = ()=>
{
    const user = realm.objects('User')[0]
    realm.write(() => 
    {
        realm.delete(user);
    });
}

export const getUser = ()=>
{
    const user = realm.objects('User');
    if(user.length === 0)
    {
        return null;
    }
    else
    {
        console.log("user:"+user.length);
        return user[0];
    }
}