# Elasticsearch command samples
These examples use an index named `myindex` and a type of `people`. There is [sample](#test-data) data at the end of this document.
## Cluster status/health/configuration

Server status

    GET /?pretty

Cluster health

    GET /_cluster/health
    
    Status values
      green  All primary and replica shards are active.
      yellow All primary shards are active, but not all replica shards are active.
      red    Not all primary shards are active.

Detail info & server statistics

    GET /_search
    {
      "query": {
        "match_all": {}
      }
    }

Show catalog of indexes

    GET /_cat/indices?v

Count the documents in our cluster

    GET /_count

Shutdown the cluster - all nodes

    POST /_shutdown


Count the number of documents in our myindex index

    GET /myindex/_count

Count the number of documents in our myindex/people type

    GET /myindex/people/_count

Show the mapping specification for the index myindex

    GET /myindex/_mapping

## CRUD

Get documents for this index/type. Default is to return 10 records

    GET /myindex/people/_search

Add a document

    # Use our own key
    PUT /myindex/people/sheajim
    {
      "lastname":  "Shea",
      "firstname": "Jim"
    }
    
    # Response
    {
      "_index":   "myindex",
      "_type":    "people",
      "_id":      "sheajim",
      "_version": 1,
      "created":  true
    }
    
    # Have Elasticsearch autogenerate a key for us 
    # (22 character URL-safe, Base64-encoded UUID)
    POST /myindex/people/
    {
      "lastname":  "Shea",
      "firstname": "Jim"
    }
    
    # Response - Note created is true, we created a document
    # instead of replacing an existing one
    {
      "_index":   "myindex",
      "_type":    "people",
      "_id":      "AUs8x-ZIvgrPKS83eEMb",
      "_version": 1,
      "created":  true
    }
    
    # To ensure creation or fail if it already exists
    # (HTTP 201 if created, 409 if it already exists)
    PUT /myindex/people/sheajim?op_type=create
    {...}
    
    or
    
    PUT /myindex/people/sheajim/_create
    {...}

Get one document by id

    GET /myindex/people/sheajim
    
    # If not found (also HTTP response code will be 404)
    {
      "_index": "myindex",
      "_type":  "people",
      "_id":    "sheajim",
      "found":  false
    }
    
    # Found
    {
    "_index": "myindex",
    "_type":  "people",
    "_id":    "sheajim",
    "_version": 1,
    "found": true,
    "_source": {
        "lastname":  "Shea",
        "firstname": "Jim"
      }
    }

By default the whole document is returned.

    # Get just the last name
    GET /myindex/people/sheajim?_source=lastname
    
    # Response
    {
      "_index":   "myindex",
      "_type":    "people",
      "_id":      "sheajim",
      "_version": 1,
      "found":    true,
      "_source": {
        "lastname": "Shea"
      }
    }
    
    # Get just the _source data
    GET /myindex/people/sheajim/_source
    
    # Response
    {
      "lastname":  "Shea",
      "firstname": "Jim"
    }

Check if a document exists

    HEAD /myindex/people/sheajim
    
    # Response has no body. HTTP 200 means it exists, 404 if it doesn't

Update a document (actually replaces the existing document with a new one)

    PUT /myindex/people/sheajim
    {
      "lastname":  "Shea",
      "firstname": "Jim",
      "mi": "T"
    }
    
    # To ensure the document wasn't updated underneath us
    PUT /myindex/people/sheajim?version=4 // use actual version, not just 4!
    {
      "lastname": "Shea",
      "firstname": "Jim",
      "mi": "T"
    }
    
    # Response - Note incremented _version and created is false
    {
      "_index":   "myindex",
      "_type":    "people",
      "_id":      "sheajim",
      "_version": 2,
      "created":  false
    }

Partial updates to documents - Pass the updates as a "doc" parameter

    POST /myindex/people/sheajim/_update
    {
      "doc": {
        "firstname" : "James",
        "work": {
          "street": "4800 Oak Grove Dr",
          "city":   "Pasadena",
          "state":  "CA",
          "zip":    "91109"
        }
      }
    }


Delete a document

    # Deletion can also take a version number to ensure the document
    # hasn't been updated under us
    DELETE /myindex/people/sheajim
    
    # Response
    {
      "found":    true,
      "_index":   "myindex",
      "_type":    "people",
      "_id":      "sheajim",
      "_version": 2
    }

Get a document with a simple search

    GET /myindex/people/_search?q=lastname=flintstone

## Query DSL
>Although we refer to the query DSL, in reality there are two DSLs: the query DSL and the filter DSL. Query clauses and filter clauses are similar in nature, but have slightly different purposes.
* A filter asks a yes|no question of every document and is used for fields that contain exact values.
  * Is the created date in the range 2013 - 2014?
  * Does the status field contain the term published?
  * Is the lat_lon field within 10km of a specified point? 
* A query is similar to a filter, but also asks the question: How well does this document match?
  * Best matching the words full text search
  * Containing the word run, but maybe also matching runs, running, jog, or sprint
  * Containing the words quick, brown, and fox—the closer together they are, the more relevant the document
  * Tagged with lucene, search, or java—the more tags, the more relevant the document 

>A query calculates how relevant each document is to the query, and assigns it a relevance _score, which is later used to sort matching documents by relevance. This concept of relevance is well suited to full-text search, where there is seldom a completely “correct” answer.
>
>http://elastic.co/guide/en/elasticsearch/guide/current/_queries_and_filters.html

Get multiple docs - _mget

    GET /myindex/people/_mget
    {
      "ids": ["flintstonefred", "rubblebarney"]
    }

Match query

    GET /myindex/people/_search
    {
      "query" : {
        "match" : {
          "lastName" : "flintstone"
        }
      }
    }

Gets two docs with bowling. **Note** when I had fred's notes as a longer string, it was rated lower even though it had the full phrase!

    GET /myindex/people/_search
    {
      "query" : {
        "match" : {
          "notes" : "loves bowling"
        }
      }
    }

Gets one doc with the phrase "loves bowling". **Todo** explain match vs match_phrase

    GET /myindex/people/_search
    {
      "query" : {
          "match_phrase" : {
          "notes" : "loves bowling"
        }
      }
    }

Gets one doc with the phrase "loves bowling" with highlighting

    GET /myindex/people/_search
    {
      "query" : {
        "match_phrase" : {
          "notes" : "loves bowling"
        }
      },
      "highlight": {
        "fields" : {
          "notes" : {}
        }
      }
    }
**Todo** Show output with highlighting

Gets one doc with the phrase "loves bowling" and adds a filter for `mobile` value less than 40

    GET /myindex/people/_search
    {
      "query" : {
        "filtered" : {
          "query" : {
            "match" : {
              "lastName" : "flintstone"
            }
          },
          "filter" : {
            "range" : {
              "mobile" : { "lt" : "40" }
            }
          }
        }
      }
    }

## Analytics
How often are keywords included in the notes

    GET /myindex/people/_search
    {
      "aggs": {
        "all_notes": {
          "terms": { "field": "notes" }
        }
      }
    }
    
How often are keywords included in the notes

    GET /myindex/people/_search
    {
      "aggs": {
        "all_notess": {
          "terms": { "field": "notes" },
          "aggs" : {
            "avg_age" : {
              "avg" : { "field" : "age" }
            }
          }
        }
      }
    }

Delete index myindex

    DELETE /myindex


## Test data
```javascript
PUT /myindex/people/flintstonefred
{
  "firstName":  "Fred",
  "lastName":   "Flintstone",
  "address": {
    "street": "345 Cave Stone Rd",
    "city":       "Bedrock",
    "state":      "NA",
    "zip":        "123"
  },
  "phone": {
    "mobile":"33",
    "home":  "111",
    "work":  "x"
  },
  "email":      "Fred@Flintstone.com",
  "birthday":   "1970-01-01",
  "children":   "1",
  "notes":      "husband father loves bowling"
}

PUT /myindex/people/flintstonewilma
{
  "firstName":  "Wilma",
  "lastName":   "Flintstone",
  "address": {
    "street":     "345 Cave Stone Rd",
    "city":       "Bedrock",
    "state":      "NA",
    "zip":        "123"
  },
  "phone": {
    "mobile":"44",
    "home":  "11",
    "work":  "x"
  },
  "email":      "Wilma@Flintstone.com",
  "birthday":   "1971-01-01",
  "children":   "1",
  "notes":      "spending money charge it"
}

PUT /myindex/people/rubblebarney
{
  "firstName":  "Barney",
  "lastName":   "Rubble",
  "address": {
    "street":     "123 Granite Way",
    "city":       "Bedrock",
    "state":      "NA",
    "zip":        "123"
  },
  "phone": {
    "mobile":"55",
    "home":  "22",
    "work":  "x"
  },
  "email":      "Barney@Rubble.com",
  "birthday":   "1972-01-01",
  "children":   "1",
  "notes":      "father husband bowling golf"
}

PUT /myindex/people/rubblebetty
{
  "firstName":  "Betty",
  "lastName":   "Rubble",
  "address": {
    "street":     "123 Granite Way",
    "city":       "Bedrock",
    "state":      "NA",
    "zip":        "123"
  },
  "phone": {
    "mobile":"66",
    "home":  "22",
    "work":  "x"
  },
  "email":      "Betty@Rubble.com",
  "birthday":   "1973-01-01",
  "children":   "1",
  "notes":      "spending money charge it"
}
```