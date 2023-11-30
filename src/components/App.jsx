import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { getImages } from '../services/imagesService';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { animateScroll } from 'react-scroll';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [loadMore, setLoadMore] = useState(false);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [alt, setAlt] = useState('');

  const onSubmitForm = query => {
    setQuery(query);
    setItems([]);
    setPage(1);
    setLoadMore(false);
  };

  const onOpenModal = (largeImageURL, alt) => {
    setShowModal(true);
    setLargeImageURL(largeImageURL);
    setAlt(alt);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  const onloadMore = () => {
    setPage(page + 1);
    animateScroll.scrollToBottom({
      duration: 1000,
      delay: 5,
      smooth: 'linear',
    });
  };

  const getItems = async (query, page) => {
    if (!query) {
      return;
    }

    setIsLoading(true);

    try {
      const { hits, totalHits } = await getImages(query, page);
      setItems([...items, ...hits]);
      setLoadMore(page < Math.ceil(totalHits / 12));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getItems(query, page);
  }, [query, page]);

  return (
    <>
      <Searchbar onSubmit={onSubmitForm} />
      {isLoading ? (
        <Loader />
      ) : (
        <ImageGallery images={items} onOpenModal={onOpenModal} />
      )}
      {showModal && (
        <Modal largeImageURL={largeImageURL} alt={alt} onClose={onCloseModal} />
      )}
      {loadMore && <Button onloadMore={onloadMore} />}
    </>
  );
};
