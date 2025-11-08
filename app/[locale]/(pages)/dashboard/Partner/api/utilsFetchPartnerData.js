import { getAllPartners, deletePartnerApi, getPartnerById } from "./api";
import SuccessDialog from "../../SuccessDialog/SuccessDialog";

export const initializeFormData = (data) => {
    return {
        id: data.id || '',
        name: data.name || '',
        images: data.images || [],
        uri: data.uri || '',
    }
}

export const fetchPartners = async (currentPage, setPartners, setTotalPages, showModal) => {
    try {
        const data = await getAllPartners(currentPage);
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
            setPartners([]);
            setTotalPages(1);
            return;
        }
        setPartners(data.items);
        setTotalPages(data.totalPages);
    } catch (error) {
        console.error('Error fetching partners:', error.message);
        setPartners([]);
        return { error: "Failed to fetch partners list" };
    }
}

export const deletePartner = async (id, currentPage, partners, handlePageChange, setPartners, showModal) => {
    try {
        const result = await deletePartnerApi(id);
        if (result.success) {
            setPartners(prevPartners => prevPartners.filter((partner) => partner.id !== id));
            const newPage = currentPage > 1 && partners.length === 1 ? currentPage - 1 : currentPage;
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
        return { error: "Failed to delete" };
    }
}

export const fetchPartnerData = async (partnerId, type) => {
    if (type === 'edit' && partnerId) {
        try {
            const data = await getPartnerById(partnerId);
            if (data.error) {
                const errorMessage = data.error;
                console.error('Error fetching partner data:', errorMessage);
                return { error: errorMessage };
            }
            const updatedFormData = {
                id: data.id,
                images: data.images || [],
                name: data.name || '',
                uri: data.uri || '',
            };
            return updatedFormData;
        } catch (error) {
            console.error('Error fetching partner data:', error.message);
            return { error: "Failed to fetch" };
        }
    } else {
        return initializeFormData({});
    }
}