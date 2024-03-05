import { useQuery, useMutation, useQueryClient } from "react-query"
import {USERLEVEL} from "../otherFunc/customDataTypes";


export const useMutationInitialInsert = (axiosUrl, onSuccess, onError) => {
    const queryClient = useQueryClient();
    return useMutation(axiosUrl,{
      onSuccess,
      onError
    })
  }



  // export const useAddSuperHeroData = (uniqueKey,addSuperHero) => {
  //   const queryClient = useQueryClient();
  //   return useMutation(addSuperHero,{
  //     onSuccess: (data) => {
  //       // queryClient.invalidateQueries("super-heroes")
  //      queryClient.setQueryData(uniqueKey, (oldQueryData) => {
  //        return {
  //         ...oldQueryData,
  //         data: [...oldQueryData.data, data.data]
  //        }
  //      })
  //     }
  //   })
  // }


  
export const useQueryData = (uniqueKey,axiosUrl, onSuccess, onError) => {
  return useQuery(uniqueKey, axiosUrl, {
    onSuccess,
    onError,
    // refetchIntervalInBackground:true
    // staleTime:10000
  
   })
}




export const useQueryData1 = (uniqueKey,id,axiosUrl, onSuccess, onError) => {
  return useQuery([uniqueKey, id], axiosUrl, {
    onSuccess,
    onError,
    // refetchIntervalInBackground:true
    // staleTime:10000
  
   })
}





export const useQueryDataID = (uniqueKey,axiosUrl, onSuccess, onError) => {
  return useQuery(uniqueKey, axiosUrl, {
    onSuccess,
    onError,
  
   })
}



export const useQueryDataSelect = (uniqueKey,axiosUrl, onSuccess, onError) => {
  return useQuery(uniqueKey, axiosUrl, {
    onSuccess,
    onError,
    Select: (data) => ({
      managers: data.data.map(da => da.users.find(user => user.user_level === USERLEVEL.MANAGER)),
      allData: [...data, managers],
    }),
    // refetchIntervalInBackground:true
    // staleTime:10000
  
   })
}






export const useQueryDataSelect1 = (uniqueKey,axiosUrl, onSuccess, onError) => {
  return useQuery(uniqueKey, axiosUrl, {
    onSuccess,
    onError,
    Select: (data) => {
         const custData = data.data.map(cust => `${cust.fname} - ${cust.lname} - ${cust.email} - ${cust.contact}`)
    },
    // refetchIntervalInBackground:true
    // staleTime:10000
  
   })
}





export const useSingleData = (uniqueKey,mainqueryUniqueKey,id,axiosUrl, onSuccess, onError) => {
  const queryClient = useQueryClient()
 return useQuery([uniqueKey, id], () => axiosUrl(id), {
  onSuccess,
  onError,
    initialData: () => {
        const info = queryClient.getQueryData(mainqueryUniqueKey)?.data?.find(info => info.id === id)
        if(info){
            return {
                data: info
            }
        } else {
            return undefined
        }
    }
 })

}






export const useSingleDataEnabled = (uniqueKey,mainqueryUniqueKey,id,axiosUrl, onSuccess, onError, enabledId) => {
  const queryClient = useQueryClient()
 return useQuery([uniqueKey, id], () => axiosUrl(id), {
  onSuccess,
  onError,
  enabled:!!enabledId,
    initialData: () => {
        const info = queryClient.getQueryData(mainqueryUniqueKey)?.data?.find(info => info.id === id)
        if(info){
            return {
                data: info
            }
        } else {
            return undefined
        }
    }
 })

}








export const useQueryEvent = (uniqueKey,axiosUrl, onSuccess, onError) => {
  return useQuery(uniqueKey, axiosUrl, {
    onSuccess,
    onError,
    enabled:false
    // refetchIntervalInBackground:true
    // staleTime:10000
  
   })
}


export const useQueryDataNoCallBack = (uniqueKey,axiosUrl) => {
  return useQuery(uniqueKey, axiosUrl)
}