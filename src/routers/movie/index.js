export default{
    path : '/movie',
    component : () => import('@/views/Movie'),
    children :[
        // {
        //     path : 'city',
        //     component :() => import('@/components/City')
        // },
        {
            path : 'nowPlaying',
            component :() => import('@/components/NowPlaying')
        },
        {
            path : 'comingSoon',
            component :() => import('@/components/ComingSoon')
        },
        {
            path : 'search',
            component :() => import('@/components/Search')
        },
        //电影详情页路由
        {
            path : 'detail/1/:movieId',
            components : {//命名视图使用compons
                default : () => import('@/components/NowPlaying'),
                detail : () => import('@/views/Movie/detail')
            },
            props : {
                detail :true
            }
        },
        {
            path : 'detail/2/:movieId',
            components : {//命名视图使用compons
                default : () => import('@/components/ComingSoon'),
                detail : () => import('@/views/Movie/detail')
            },
            props : {
                detail :true
            }
        },
        {
            path : 'detail/3/:movieId',
            components : {//命名视图使用compons
                default : () => import('@/components/Search'),
                detail : () => import('@/views/Movie/detail')
            },
            props : {
                detail :true
            }
        },
        //城市页路由
        // {
        //     path : 'cities',
        //     components : {//命名视图使用compons
        //         cities : () => import('@/views/Movie/cities')
        //     }
        // },
        {
            path : '/movie',
            redirect : 'nowPlaying'
        }
    ]
}