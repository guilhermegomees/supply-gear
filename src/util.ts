import { api } from "./services/api";
import { Buffer } from 'buffer';

export const fetchImagem = async (
    imageName: string,
    onSuccess: (base64: string) => void,
    onError: (error: string) => void,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
    try {
        const response = await api.get(`getImageProducts/${imageName}`, {
            responseType: 'arraybuffer',
        });

        const base64String: string = Buffer.from(response.data, 'binary').toString('base64');
        const base64: string = `data:image/jpeg;base64,${base64String}`;

        onSuccess(base64);
    } catch (error : any) {
        console.error('Erro ao obter imagem:', error.message);
        onError('Erro ao carregar a imagem');
    } finally {
        setLoading(false);
    }
};

// import { fetchImagem } from '../../util';
// import Loading from '../../../assets/loading.svg';

// const [imagem, setImagem] = useState<string>('');
// const [error, setError] = useState<string>('');
// const [loading, setLoading] = useState<boolean>(true);

// useEffect(() => {
//     if (product.image) {
//         fetchImagem(
//             product.image,
//             (base64: string) => setImagem(base64),
//             (errorMessage: string) => setError(errorMessage),
//             setLoading
//         );
//     }
// }, [product.image]);

// {loading ? (
//     <Loading height={90} width={90} />
// ) : (
//     <Image
//         source={{ uri: imagem }}
//         style={{
//             width: 90,
//             height: 90,
//             borderRadius: 15,
//         }}
//     />
// )}

// Usar para chamar imagem