import { logoutUser } from '../../../[locale]/(pages)/auth/login/api';
import SuccessDialog from '../../../[locale]/(pages)/dashboard/SuccessDialog/SuccessDialog';

const handleForbiddenAccess = (result, showModal, logoutDependencies) => {
    showModal('confirmation',
        <SuccessDialog
            title={"Помилка"}
            message={result?.error || "У вас недостатньо прав для доступу або ваш токен недійсний."}
            buttonText={"До входу"}
            onRedirect={() => {
                logoutUser(logoutDependencies);
                window.location.href = '/auth/login';
            }}
        />
    );
};

export default handleForbiddenAccess;