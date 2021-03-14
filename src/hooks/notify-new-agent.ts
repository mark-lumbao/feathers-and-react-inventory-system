// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import { sendMail } from '../utils';

/**
 * @NOTE This hook notifies newly created use via email.
 */
export default (): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { placeholderPassword, email } = context.data;

    /**
     * Only notify users that are created via registration form.
     * Which are specific for agents.
     */
    if (placeholderPassword) {
      await sendMail({
        from: 'your-email@gmail.com', // sender address
        to: email, // list of receivers
        subject: 'New {comapany-name} Account', // Subject line
        html: `Your new {comapany-name} credentials are <br/> <strong>email: ${email}</strong> <br /> <strong>password: ${placeholderPassword}</strong>`,
      });
    }

    return context;
  };
};
