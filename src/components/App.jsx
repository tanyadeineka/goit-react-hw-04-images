import React, { useState, useEffect } from "react";
import { Searchbar } from "./Searchbar/Searchbar"
import { fetchImages } from "./pixabay-api";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [totalHits, setTotalHits] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const [modalAlt, setModalAlt] = useState('');

  useEffect(() => {
    async function getImages() {
      try {
        setIsLoading(true);
        const data = await fetchImages(query, page);
        const { hits, totalHits } = data;
        setImages(prevImg => [...prevImg, ...hits]);
        setTotalHits(totalHits);
      } catch (error) {
        alert('Something went wrong, please try again later');
      } finally {
        setIsLoading(false);
      }
    }
    if (query) {
      getImages();
    }
  }, [query, page]);

  const handleFormSubmit = query => {
    setImages([]);
    setQuery(query);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);  
  };

  const toggleModal = (modalImg, modalAlt) => {
    setShowModal(prevShowModal => !prevShowModal);
    setModalImg(modalImg);
    setModalAlt(modalAlt);
  };

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <Searchbar onSubmit={handleFormSubmit} />
        <ImageGallery
          images={images}
          openModal={toggleModal}
        />
        {totalHits / 12 >= page && <Button onClick={loadMore} />}
        {isLoading && <Loader />}
        {showModal && (
          <Modal
            modalImg={modalImg}
            modalAlt={modalAlt}
            closeModal={toggleModal}
          />
        )}
      </div>
    );
}
