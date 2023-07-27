export const handleFileInputClick = (index) => () => {
    const fileInput = document.getElementById(`fileInput${index}`);
    fileInput.click();
};

export const handleImageChange = (index, event, setImagePreviews, images, setImages, imagePreviews) => {
    const selectedImage = event.target.files[0];

    if (selectedImage) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const newImagePreviews = [...imagePreviews];
            newImagePreviews[index] = reader.result;
            setImagePreviews(newImagePreviews);
        };
        reader.readAsDataURL(selectedImage);
    }

    const newImages = [...images];
    newImages[index] = selectedImage;
    setImages(newImages);
};
