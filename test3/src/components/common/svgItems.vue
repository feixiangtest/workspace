<template>
    <div>
        <svg v-if='showBasicInfo' version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
                        <g>
                          <path fill="#C7CFFF" d="M46.967,38.34c0,1.598-1.299,2.796-2.797,2.796H26.398l-9.785,5.491l-2.495-5.491H5.73
                            c-1.598,0-2.795-1.298-2.795-2.796V5.692c0-1.598,1.297-2.796,2.795-2.796H44.17c1.598,0,2.797,1.298,2.797,2.796V38.34z"/>
                          <path fill="#FFFFFF" d="M2.936,2.597V32.35c0,1.599,1.297,2.896,2.795,2.896h8.388l2.495,5.591l9.785-5.591H44.17
                            c1.598,0,2.797-1.298,2.797-2.896V2.597H2.936z"/>
                          <path fill="#557FDD" d="M44.17,0.001H5.73c-3.096,0-5.592,2.596-5.592,5.69v32.647c0,3.096,2.496,5.691,5.69,5.691h6.489
                            l2.396,5.29c0,0,0.699,1.1,2.098,0.5l10.383-5.892H44.17c3.096,0,5.691-2.495,5.691-5.689V5.69
                            C49.861,2.597,47.266,0.001,44.17,0.001z M46.967,38.34c0,1.598-1.299,2.796-2.797,2.796H26.398l-9.785,5.491l-2.495-5.491H5.73
                            c-1.598,0-2.795-1.298-2.795-2.796V5.692c0-1.598,1.297-2.796,2.795-2.796H44.17c1.598,0,2.797,1.298,2.797,2.796V38.34z"/>
                          <g>
                            <path fill="#F3B301" d="M27.896,29.255H12.919c-0.799,0-1.397,0.599-1.397,1.396v0.101c0,0.799,0.6,1.396,1.397,1.396h14.978
                              c0.799,0,1.396-0.599,1.396-1.396v-0.101C29.293,29.953,28.596,29.255,27.896,29.255z"/>
                            <path fill="#F3B301" d="M36.98,19.67H12.918c-0.799,0-1.396,0.599-1.396,1.396v0.101c0,0.799,0.599,1.397,1.396,1.397H36.98
                              c0.799,0,1.398-0.6,1.398-1.397v-0.101C38.379,20.269,37.68,19.67,36.98,19.67z"/>
                            <path fill="#F3B301" d="M36.98,9.985H12.918c-0.799,0-1.396,0.6-1.396,1.397v0.1c0,0.8,0.599,1.398,1.396,1.398H36.98
                              c0.799,0,1.398-0.6,1.398-1.398v-0.1C38.379,10.684,37.68,9.985,36.98,9.985z"/>
                          </g>
                        </g>
                      </svg>
        <svg v-if='showRebatesSet' version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
                          <g>
                            <circle fill="#C7CFFF" cx="24.4" cy="25" r="23.5"/>
                            <path fill="#FFFFFF" d="M30.301,41.6c6.199,0,11.799-2.398,16.1-6.199c1.602-3.199,2.5-6.801,2.5-10.601c0-13-10.5-23.5-23.5-23.5
                              c-7.199,0-13.6,3.2-17.899,8.3c-0.8,2.5-1.3,5.101-1.3,7.801C6.2,30.8,17,41.6,30.301,41.6z"/>
                            <path fill="#557FDD" d="M25,0C11.2,0,0,11.2,0,25s11.2,25,25,25c13.801,0,25-11.2,25-25S38.801,0,25,0z M25,47.2
                              c-12.3,0-22.2-10-22.2-22.2S12.7,2.8,25,2.8c12.199,0,22.199,9.9,22.199,22.2C47.1,37.2,37.199,47.2,25,47.2z"/>
                            <g>
                              <path fill="#F3B301" d="M30.699,14.1C30,13.7,29.199,14,28.801,14.7L18.1,33.9c-0.4,0.699-0.1,1.5,0.6,1.898
                                c0.701,0.4,1.5,0.102,1.9-0.6l10.6-19.301C31.6,15.4,31.301,14.5,30.699,14.1z"/>
                              <path fill="#F3B301" d="M32.699,23.8c-2.799,0-5,2.3-5,5.2s2.301,5.2,5,5.2c2.701,0,5-2.3,5-5.2S35.4,23.8,32.699,23.8z
                                M32.699,31.4C31.5,31.4,30.5,30.299,30.5,29s1-2.4,2.199-2.4c1.201,0,2.201,1.102,2.201,2.4S33.9,31.4,32.699,31.4z"/>
                              <path fill="#F3B301" d="M22.1,20.1c0-2.899-2.299-5.199-5-5.199c-2.699,0-5,2.3-5,5.199c0,2.9,2.301,5.2,5,5.2
                                C19.801,25.3,22.1,23,22.1,20.1z M17,22.5c-1.2,0-2.2-1.1-2.2-2.4c0-1.3,1-2.399,2.2-2.399c1.199,0,2.199,1.1,2.199,2.399
                                C19.199,21.4,18.301,22.5,17,22.5z"/>
                            </g>
                          </g>
                        </svg>

                        <svg v-if='showIsChecked' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    width="20px" height="20px" viewBox="281 371 50 50" enable-background="new 281 371 50 50" xml:space="preserve">
                      <g>
                        <path fill="#00D8D5" d="M306,371c-13.8,0-25,11.2-25,25s11.2,25,25,25s25-11.2,25-25S319.8,371,306,371z M319,389.3L303.5,404.9
                          c-0.4,0.399-1.1,0.5-1.6,0.3c-0.2-0.101-0.3-0.2-0.5-0.3l-8.4-8.4c-0.6-0.6-0.6-1.5,0-2.1s1.5-0.6,2.1,0l7.3,7.3l14.5-14.5
                          c0.6-0.6,1.5-0.6,2.1,0C319.6,387.7,319.6,388.7,319,389.3z"/>
                      </g>
                  </svg>

                  <svg v-if='noChecked' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                      width="20px" height="20px" viewBox="281 371 50 50" enable-background="new 281 371 50 50" xml:space="preserve">
                    <g>
                      <circle fill="#C4C4C4" cx="306" cy="396" r="25"/>
                      <path fill="#EAEAEA" d="M306,418.5c-12.4,0-22.5-10.1-22.5-22.5c0-12.4,10.1-22.6,22.5-22.6c12.4,0,22.5,10.1,22.5,22.6
                        S318.4,418.5,306,418.5z"/>
                      <path fill="#C8C8C8" d="M319,387.1c-0.6-0.6-1.5-0.6-2.1,0l-14.5,14.5l-7.4-7.3c-0.6-0.6-1.5-0.6-2.1,0c-0.6,0.6-0.6,1.5,0,2.1
                        l8.4,8.4c0.1,0.101,0.3,0.3,0.5,0.3c0.5,0.2,1.2,0.101,1.6-0.3l15.6-15.6C319.6,388.6,319.6,387.7,319,387.1z"/>
                    </g>
                  </svg>
    </div>
</template>
<script>
    export default {
      props: ['showBasicInfo', 'showRebatesSet', 'showIsChecked', 'noChecked']
    }
</script>

