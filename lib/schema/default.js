module.exports = {
  "status": 0,
  "statusInfo": "",
  "data": {
    "listData": [
      {
        "id": 2,
        "type": 0,
        "name": "测试接口。。。",
        "method": "GET",
        "path": "/xcds/sdfsfsf",
        "mocks": {
          "成功响应": {
            "type": 1,
            "content": "{\n    status: 0,\n    statusInfo: 'xx拾掇拾掇成功nemo',\n    data: {}\n}"
          },
          "失败响应": {
            "type": 1,
            "content": "{\n    status: 1,\n    statusInfo: 'xx拾掇拾掇成功nemo123123',\n    data: {}\n}"
          },
          "sdsd": {
            "type": 2,
            "content": "{\n  status: 0,\n    statusInfo: '',\n    data: {\n    \t\"provs|2\": {\n            \"310000\": \"上海市\",\n            \"320000\": \"江苏省\",\n            \"330000\": \"浙江省\",\n            \"340000\": \"安徽省\"\n        }\n    }\n}"
          }
        },
        "request": {
          "headers": {},
          "body": {
            "type": 5,
            "props": {
              "status": {
                "required": 1,
                "type": 2,
                "default": "0"
              }
            }
          }
        },
        "response": {
          "headers": {},
          "body": {
            "note": "邓斯蒂芬森发",
            "type": 4,
            "element": {
              "type": 5,
              "props": {
                "abc": {
                  "required": 0,
                  "note": "www",
                  "type": 1
                },
                "efg": {
                  "required": 1,
                  "note": "abc",
                  "type": 4
                }
              }
            }
          }
        }
      },
      {
        "id": 3,
        "type": 0,
        "name": "更新用户信息",
        "method": "get",
        "path": "/sdsf/:id/sds",
        "jsonp": "callback",
        "mocks": {},
        "request": {
          "headers": {},
          "body": {
            "note": "sss",
            "type": 1,
            "mock": "Random.cparagraph()",
            "default": "2rwfsf"
          }
        }
      },
      {
        "id": 4,
        "type": 0,
        "name": "哈哈哈。。。",
        "method": "GET",
        "path": "",
        "mocks": {},
        "request": {},
        "response": {}
      },
      {
        "id": 5,
        "type": 0,
        "name": "asdf参数的",
        "method": "GET",
        "path": "",
        "mocks": {},
        "request": {},
        "response": {}
      },
      {
        "id": 6,
        "type": 0,
        "name": "sdsd",
        "method": "GET",
        "path": "",
        "mocks": {},
        "request": {},
        "response": {}
      },
      {
        "id": 14,
        "type": 0,
        "name": "hhhh",
        "method": "GET",
        "path": "",
        "mocks": {},
        "request": {},
        "response": {}
      },
      {
        "id": 1,
        "type": 0,
        "name": "获取用户基本信息",
        "method": "GET",
        "path": "/profile/getBasicInfo",
        "mocks": {},
        "request": {
          "headers": {
            "brr": {
              "value": "32",
              "required": 1,
              "note": "ff"
            }
          },
          "body": {
            "type": 5,
            "props": {
              "sd": {
                "required": 0,
                "note": "sdd",
                "type": 4,
                "element": {
                  "type": 5,
                  "props": {
                    "zxxxxx": {
                      "required": 0,
                      "note": "333",
                      "type": 3
                    },
                    "hg": {
                      "required": 0,
                      "note": "wqqq",
                      "type": 2
                    }
                  }
                }
              },
              "abc": {
                "required": 0,
                "type": 5,
                "props": {
                  "www": {
                    "required": 1,
                    "type": 4,
                    "element": {
                      "type": 5,
                      "props": {
                        "hnj": {
                          "required": 1,
                          "note": "2sdsd",
                          "type": 3
                        }
                      }
                    }
                  },
                  "ggg333": {
                    "required": 0,
                    "type": 1
                  }
                }
              },
              "c": {
                "required": 0,
                "type": 6
              },
              "d": {
                "required": 0,
                "type": 8
              }
            }
          }
        },
        "response": {
          "headers": {},
          "body": {
            "type": 5,
            "props": {
              "age": {
                "required": 1,
                "note": "sdsd",
                "type": 2,
                "default": "3"
              },
              "bsd": {
                "required": 1,
                "type": 6
              },
              "bb": {
                "required": 1,
                "type": 4,
                "default": "sd",
                "element": {
                  "type": 5
                }
              }
            }
          }
        }
      },
      {
        "id": 7,
        "type": 0,
        "name": "获取用户基本信息222",
        "method": "GET",
        "path": "",
        "mocks": {},
        "request": {},
        "response": {}
      },
      {
        "id": 8,
        "type": 0,
        "name": "555获取用户基本信息",
        "method": "GET",
        "path": "",
        "mocks": {},
        "request": {},
        "response": {}
      },
      {
        "id": 9,
        "type": 0,
        "name": "二位是是否是否是",
        "method": "GET",
        "path": "",
        "mocks": {},
        "request": {},
        "response": {}
      }
    ],
    "pageNo": 1,
    "pageSize": 10,
    "total": 14,
    "dataTypes": [
      {
        "name": "String",
        "value": 1
      },
      {
        "name": "Number",
        "value": 2
      },
      {
        "name": "Boolean",
        "value": 3
      },
      {
        "name": "Array",
        "value": 4
      },
      {
        "name": "Object",
        "value": 5
      },
      {
        "name": "File",
        "value": 6
      },
      {
        "name": "Any",
        "value": 8
      }
    ],
    "projectName": "测试abc",
    "updateTime": 1496590507000
  }
}