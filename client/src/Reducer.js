const initialState = {
  user: null,
  error: null,
  isAdmin:false,
  users:[],
  movies:[],
  members :[]
};

const loginUser = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        isAdmin: action.payload.user.isAdmin,
        error: null,
      };
      
    case 'SET_NAME':
      console.log('User:', action.payload.user);
      return {
        ...state,
        name: action.payload,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        error: action.payload.error,
      };
    case 'ADD_NEW_USER':
      return {
        ...state,
        user: action.payload,
        users: [...state.users, action.payload], 
        error: null,
      };

      case 'ADD_NEW_MEMBER':
        return {
          ...state,
          member: action.payload,
          members: [...state.members, action.payload], 
          error: null,
        };

      case 'ADD_NEW_MOVIE':
        return {
          ...state,
          movie: action.payload,
          movies: [...state.movies, action.payload], 
          error: null,
        };

     case 'CREATE_USER_FAILED':
      return {
        ...state,
        user: null,
        error: action.payload.error,
      };
      case 'DELETE_USER':
        return {
          ...state,
          users: state.users.filter(user => user._id !== action.payload)
        };
        case 'DELETE_MOVIE':
          return {
            ...state,
            movies: state.movies.filter(movie => movie._id !== action.payload)
          };

          case 'DELETE_MEMBER':
            return {
              ...state,
              members: state.members.filter(member => member._id !== action.payload)
            };
        
        case 'UPDATE_USER':
          const updatedUser = state.users.find(user => user._id === action.payload._id);
          if (!updatedUser) {
            return state;
          }
          const updatedUsers = state.users.map(user =>
            user._id === action.payload._id ? action.payload : user
          );
          return {
            ...state,
            users: updatedUsers
          };

          case 'UPDATE_MOVIE':
            const updatedMovieIndex = state.movies.findIndex(movie => movie._id === action.payload._id);
            if (updatedMovieIndex === -1) {
              return state;
            }
            const updatedMovies = [...state.movies];
            updatedMovies[updatedMovieIndex] = action.payload;
            return {
              ...state,
              movies: updatedMovies,
            };
            case 'UPDATE_MEMBER':
            const updatedMemberIndex = state.members.findIndex(member => member._id === action.payload._id);
            if (updatedMemberIndex === -1) {
              return state;
            }
            const updatedMembers = [...state.members];
            updatedMembers[updatedMemberIndex] = action.payload;
            return {
              ...state,
              members: updatedMembers,
            };
        

        
      
    default:
      return state;
  }
};

export default loginUser;
