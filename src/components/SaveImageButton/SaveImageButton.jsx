import "./SaveImageButton.css";

function SaveImageButton ({ image, categories = [], onSaveImage}) {
    if  (!image) {
        return (
            <section className="save-image-box">
                <h2>Spara bild</h2>
                <p>Ingen bild vald ännu</p>
            </section>
        );
    }

    if (categories.length === 0) {
        return (
            <section className="save-image-box">
                <h2>Spara bild</h2>
                <p>Skapa en kategori innan du sparar bilden</p>
            </section>
        );
    }

    return (
        <section className="save-image-box">
            <h2>Spara bild</h2>

            <p>
                Spara <strong>{image.image} i en kategori.</strong>
            </p>

            <button
            type="button"
            onClick={() onSaveImage(image)}</button>

            >
            Spara bild 
            </button>
        </section>
    );


}

export default SaveImageButton;