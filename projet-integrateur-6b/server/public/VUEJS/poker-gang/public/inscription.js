let formulaire_inscription=document.getElementById("form_inscr");


console.log(validator.isEmail('Yann@gmail.com'));
console.log(Date()-new Date('2023-02-02'))


// //Verification des données avant l'envoie du formulaire puis une restrucration des données pour eviter les injection XSS
// formulaire_inscription.addEventListener('submit',(e)=>
// { 
//     let username=document.getElementById("username").value;
//     let mail=document.getElementById("mail").value;
//     let password=document.getElementById("password").value;
//     let birthday=document.getElementById("jjmmaaaa").value;

//     let username_input=document.getElementById("username");
//     let mail_input=document.getElementById("mail");
//     let password_input=document.getElementById("password");
//     let birthday_input=document.getElementById("jjmmaaaa");
    
//     console.log(username,mail,password,birthday)
//     var erreur=new Array();
//     if(!username || !mail || !password || !birthday)
//     {
//         erreur.push("Les tout les champs ne sont pas remplis ");

//         username_input.classList.add("error");
//         mail_input.classList.add("error");
//         password_input.classList.add("error");
//         birthday_input.classList.add("error");
//     }else{ 
//         if(!validator.isEmail(mail))
//         {
//             erreur.push("L'adresse mail n'est pas valide ")
            
//             mail_input.classList.add("error");
//         }else
//         {
//             mail_input.classList.remove("error");
//         }

//         if (!validator.isLength(username, 6, 12) ) 
//         {
//             erreur.push("L'username n'a pas la bonne taille, il doit faire 6 char min et 12 char max ")
//             username_input.classList.add("error");    
//         }else
//         {
//             username_input.classList.remove("error");
//         }
//         // *****TO DO *****
//         //Pour BDD : Qu'est-il autorisé ?
//         if (!validator.isLength(password, 6, 12) ) 
//         {
//             erreur.push("Le password n'a pas la bonne taille, il doit faire 6 char min et 12 char max")
//             password_input.classList.add("error");  
//         }else
//         {
//             password_input.classList.remove("error"); 
//         }
//         //verification si la date de naissance de l'utilisateur correspond a un majeur
//         if(!isAdult(new Date(birthday)))
//         {
//             erreur.push("L'utilisateur n'est pas majeur ")
//             birthday_input.classList.add("error"); 
//         }else
//         {
//             birthday_input.classList.remove("error");
//         }
//     }

//     //On affiche le message d'erreur dans le cas ou il y a un champ qui ne correspond pas 
//     if(erreur[0] !== undefined)
//     {
//         //*****TO DO*****
//         //Pour front : Ou dois-je mettre le message d'erreur ? 
//         console.log("le message d'erreur est : " ,erreur);
//         e.preventDefault();
//     }
//     //Envoie du formulaire car il n'y a pas d'erreur 
// })

/**
 * 
 * @param Date birthday
 * @return {Bool} 
 * @brief La fonction prend la date que l'on veut comparer pour la comparer a celle de jour actuel, celle-ci va retourner true si la date correspond a celle d'un adult et false a celle d'un mineur  
 * @author Le Cam Yannick
 * 
*/

export default function isAdult(birthday) 
{
    var annee = birthday.getFullYear();
    var mois = birthday.getMonth();
    var jour = birthday.getUTCDate();


    //new Date() Donne la date d'aujourd'hui
    var calcul_annee = new Date().getFullYear()-annee;
    if (calcul_annee>18) {
        return true;
    }
    else if (calcul_annee === 18) {
        var calcul_mois = new Date().getMonth()- mois;
        if (calcul_mois>0) 
        {
            return true;
        }
        else if (calcul_mois===0) 
        {
            var calcul_jour= new Date().getUTCDate()-jour;
            if(calcul_jour<0)
            {
                return false;
            }
            else
            {
                return true;
            }
        }
        else
        {
            return false;
        }
    }
    else 
    {
        return false;
    }
    //en cas de probleme
    return false;
}

