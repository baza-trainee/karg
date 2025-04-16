import { getRescuerById, deleteRescuerInfo, getAllRescuers } from "./api";
import SuccessDialog from "../SuccessDialog/SuccessDialog";
import handleForbiddenAccess from "../handleForbiddenAccess";

export const initializeFormData = (data) => {
    return {
        id: data.id || '',
        fullName: data.fullName || '',
        email: data.email || '',
        role: data.role || '',
        phoneNumber: data.phoneNumber || '',
        images: data.images || [],
    }
}

export const fetchTeamUserData = async (rescuerId, type) => {
    if (type === 'edit' && rescuerId) {
        try {
            const data = await getRescuerById(rescuerId);
            if (data?.status === 403) {
                return data;
            }
            if (data?.error) {
                const errorMessage = data.error;
                console.error('Error fetching rescuer data:', errorMessage);
                return { error: errorMessage };
            }
            const updatedFormData = {
                id: data.id,
                fullName: data.fullName || '',
                email: data.email || '',
                role: data.role || '',
                phoneNumber: data.phoneNumber || '',
                images: data.images || [],
            };
            return updatedFormData;
        } catch (error) {
            console.error('Error fetching rescuer data:', error.message);
            return { error: "Failed to fetch rescuer" };
        }
    } else {
        return initializeFormData({});
    }
}

export const deleteTeamUserData = async (id, currentPage, rescuers, handlePageChange, setRescuers, showModal, logoutDependencies) => {
    try {
        const result = await deleteRescuerInfo(id);
        if (result?.status === 403) {
            handleForbiddenAccess(result, showModal, logoutDependencies);
        }
        if (result?.success) {
            setRescuers(prevRescuers => prevRescuers.filter((rescuer) => rescuer.id !== id));
            const newPage = currentPage > 1 && rescuers.length === 1 ? currentPage - 1 : currentPage;
            handlePageChange(newPage);
        } else {
            console.error(`Видалення не виконано. Сервер повернув: ${result.error}`);
            showModal('confirmation',
                <SuccessDialog
                    title={"Помилка"}
                    message={result.error || "Не вдалося видалити запис."}
                    buttonText={"Закрити"}
                />);
        }
    } catch (error) {
        console.error(`Error deleting ID ${id} :`, error);
        return { error: "Failed to delete rescuer" };
    }
}

export const fetchTeamData = async (currentPage, setRescuers, setTotalPages, showModal, logoutDependencies) => {
    try {
        const data = await getAllRescuers(currentPage);
        if (data?.status === 403) {
            handleForbiddenAccess(data, showModal, logoutDependencies);
            return;
        }
        if (data?.error) {
            const errorMessage = data.error === 'not_found'
                ? 'Записи не знайдено, або було видалено.'
                : data.error;
            console.error('Помилка при отриманні даних:', data.error);
            if (showModal) {
                showModal(
                    'confirmation',
                    <SuccessDialog
                        title="Помилка"
                        message={errorMessage}
                        buttonText="Закрити"
                    />
                );
            }
            setRescuers([]);
            setTotalPages(1);
            return;
        }
        setRescuers(data.items);
        setTotalPages(data.totalPages);
    } catch (error) {
        console.error('Error fetching rescuers:', error.message);
        setRescuers([]);
        return { error: "Failed to fetch rescuers" };
    }
};

