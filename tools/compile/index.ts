import fixPathFormats from './fixPathFormats'
import place200AppJsons from './place200AppJsons'

const INPUT_FILE = 'constants/openAPI_3.json'
const DIST_FILE = 'constants/openAPI_3_dist.json'

fixPathFormats({
  INPUT_FILE,
  DIST_FILE,
})

place200AppJsons({
  DIST_FILE,
  RESPONSES_200_DIR: 'constants/responses/200',
})
