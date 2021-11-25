import {
  collection, 
  query, 
  where, 
  getDocs,
  getFirestore
} from "firebase/firestore";


const seila = async ()=>{
  const db = getFirestore();
  const q = query(collection(db, "info-advogado"), where("Tipo", "==", "Criminal"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
  console.log(q);
});}




export default [
    {
      id: 1,
      name: 'Beatriz Farias',
      email: 'Direito criminal',
      avatar: 'https://i.pravatar.cc/150?img=31',
    },
    {
      id: 2,
      name: 'Julia Santos',
      email: 'Direito criminal',
      avatar: 'https://i.pravatar.cc/150?img=32',
    },
    {
      id: 3,
      name: 'Pedro Mendonça',
      email: 'Direito criminal',
      avatar: 'https://i.pravatar.cc/150?img=33',
    },
    {
      id: 4,
      name: 'Julia Shinoda',
      email: 'Direito criminal',
      avatar: 'https://i.pravatar.cc/150?img=34',
    },
    {
      id: 5,
      name: 'Andrezza Shinoda',
      email: 'Direito criminal',
      avatar: 'https://i.pravatar.cc/150?img=35',
    },
    {
      id: 6,
      name: 'Sara Maria',
      email: 'Direito criminal',
      avatar: 'https://i.pravatar.cc/150?img=36',
    },
    {
      id: 7,
      name: 'Edna Sousa',
      email: 'Direito criminal',
      avatar: 'https://i.pravatar.cc/150?img=37',
    },
  ];
  