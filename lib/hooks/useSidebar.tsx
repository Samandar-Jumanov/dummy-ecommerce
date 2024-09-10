import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from '../sidebarSlice';
import { RootState } from '../store';


const useSidebar = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state  : RootState) => state.sidebar.isOpen);

  const openSidebar = () => dispatch(toggleSidebar());
  const closeSidebar = () => dispatch(toggleSidebar());

  return {
    isOpen,
    openSidebar,
    closeSidebar,
  };
};

export default useSidebar;