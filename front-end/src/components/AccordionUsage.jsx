import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';

function AccordionUsage({ handleOpenCnd, handleCloseCnd }) {
    return (
      <Dialog 
        open={handleOpenCnd}
        onClose={handleCloseCnd}>
        <DialogTitle>Vous devez lire et accepter les conditions d'utilisation</DialogTitle>
        <DialogContentText padding={2}>
            Conditions d'utilisation de l'application TalkMail

            1. Acceptation des conditions

            L'utilisation de l'application TalkMail est soumise aux présentes conditions générales d'utilisation. En vous inscrivant à l'application, vous acceptez expressément et sans réserve ces conditions.

            2. Objet

            TalkMail est un service de messagerie électronique, de messagerie instantanée et d'agenda. Il permet aux utilisateurs de communiquer, de partager des fichiers et de planifier des rendez-vous de manière efficace.

            3. Inscription

            Pour profiter des fonctionnalités de l'application, l'utilisateur doit créer un compte en fournissant une adresse électronique valide et en définissant un mot de passe sécurisé.

            4. Utilisation de l'application

            L'utilisateur s'engage à utiliser TalkMail de manière responsable, en respectant les droits des autres utilisateurs. Cela inclut :

            Ne pas diffuser de contenu illégal, offensant, discriminatoire ou contraire aux bonnes mœurs.
            Éviter l'utilisation de mots vulgaires ou injurieux.
            Ne pas envoyer de spam ou de messages publicitaires non sollicités.
            S'abstenir d'usurper l'identité d'un tiers.
            Ne pas perturber le bon fonctionnement de l'application.
            5. Responsabilité

            L'éditeur de TalkMail ne peut être tenu responsable des dommages liés à l'utilisation de l'application, tels que la perte de données, les virus ou une utilisation frauduleuse.

            6. Modification des conditions

            L'éditeur se réserve le droit de modifier ces conditions à tout moment. Les modifications entrent en vigueur dès leur publication sur le site de l'application.

            7. Droit applicable

            Ces conditions sont régies par le droit français.

            8. Litiges

            En cas de litige, les parties s'efforceront de trouver une solution à l'amiable. À défaut, le litige sera porté devant les tribunaux compétents.

            9. Contact

            Pour toute question ou réclamation, vous pouvez contacter l'éditeur de TalkMail à l'adresse suivante : contact@talkmail.dz ou contact.isinnovate@gmail.com .

            Ces conditions peuvent être adaptées pour inclure des détails spécifiques à l'application et des dispositions additionnelles en fonction de vos besoins particuliers.
        </DialogContentText>
        <Button onClick={handleCloseCnd}>Close</Button>
      </Dialog>
    );
}
export default AccordionUsage